import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime


def handler(event: dict, context) -> dict:
    """
    Принимает данные заказа с сайта Little Spirits и отправляет уведомление на почту владельца.
    Поля: name, phone, email, address, comment, items (список товаров), total.
    """
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
        "Access-Control-Max-Age": "86400",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {
            "statusCode": 405,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Method not allowed"}),
        }

    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Invalid JSON"}),
        }

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    email = body.get("email", "").strip()
    address = body.get("address", "").strip()
    comment = body.get("comment", "").strip()
    items = body.get("items", [])
    total = body.get("total", 0)

    if not name or not phone or not address:
        return {
            "statusCode": 400,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Необходимо заполнить: имя, телефон, адрес"}),
        }

    notify_email = os.environ.get("NOTIFY_EMAIL", "")
    smtp_host = os.environ.get("SMTP_HOST", "smtp.yandex.ru")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASS", "")

    order_time = datetime.now().strftime("%d.%m.%Y %H:%M")

    items_html = ""
    for item in items:
        items_html += f"""
        <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #1a3020;">{item.get('emoji', '✦')} {item.get('name', '')}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #1a3020; text-align: center;">{item.get('qty', 1)}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #1a3020; text-align: right; color: #c8a840;">{item.get('price', 0) * item.get('qty', 1):,} ₽</td>
        </tr>
        """

    html_body = f"""
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 0; background: #0d1f12; font-family: Georgia, serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            
            <div style="text-align: center; margin-bottom: 40px;">
                <p style="color: #6b9e6b; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 8px;">✦ little spirits ✦</p>
                <h1 style="color: #e8d8a0; font-size: 28px; margin: 0; font-weight: 300; letter-spacing: 2px;">Новый заказ!</h1>
                <p style="color: #6b6b4f; font-size: 13px; margin: 8px 0 0;">{order_time}</p>
            </div>

            <div style="background: #0f2218; border: 1px solid #1e3828; border-radius: 16px; padding: 28px; margin-bottom: 24px;">
                <h2 style="color: #c8a840; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 20px; font-weight: 400;">Покупатель</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="color: #6b6b4f; padding: 6px 0; font-size: 13px; width: 120px;">Имя</td><td style="color: #e8d8a0; padding: 6px 0; font-size: 14px;">{name}</td></tr>
                    <tr><td style="color: #6b6b4f; padding: 6px 0; font-size: 13px;">Телефон</td><td style="color: #e8d8a0; padding: 6px 0; font-size: 14px;">{phone}</td></tr>
                    {"<tr><td style='color: #6b6b4f; padding: 6px 0; font-size: 13px;'>Email</td><td style='color: #e8d8a0; padding: 6px 0; font-size: 14px;'>" + email + "</td></tr>" if email else ""}
                    <tr><td style="color: #6b6b4f; padding: 6px 0; font-size: 13px; vertical-align: top;">Адрес</td><td style="color: #e8d8a0; padding: 6px 0; font-size: 14px;">{address}</td></tr>
                    {"<tr><td style='color: #6b6b4f; padding: 6px 0; font-size: 13px; vertical-align: top;'>Комментарий</td><td style='color: #e8d8a0; padding: 6px 0; font-size: 14px; font-style: italic;'>" + comment + "</td></tr>" if comment else ""}
                </table>
            </div>

            <div style="background: #0f2218; border: 1px solid #1e3828; border-radius: 16px; padding: 28px; margin-bottom: 24px;">
                <h2 style="color: #c8a840; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 20px; font-weight: 400;">Состав заказа</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="color: #6b6b4f; font-size: 12px; font-weight: 400; text-align: left; padding: 6px 12px; border-bottom: 1px solid #1a3020;">Хранитель</th>
                            <th style="color: #6b6b4f; font-size: 12px; font-weight: 400; text-align: center; padding: 6px 12px; border-bottom: 1px solid #1a3020;">Кол-во</th>
                            <th style="color: #6b6b4f; font-size: 12px; font-weight: 400; text-align: right; padding: 6px 12px; border-bottom: 1px solid #1a3020;">Сумма</th>
                        </tr>
                    </thead>
                    <tbody style="color: #e8d8a0; font-size: 14px;">
                        {items_html}
                    </tbody>
                </table>
                <div style="border-top: 1px solid #2a4030; margin-top: 16px; padding-top: 16px; display: flex; justify-content: space-between;">
                    <span style="color: #6b6b4f; font-size: 13px;">Итого</span>
                    <span style="color: #c8a840; font-size: 20px;">{total:,} ₽</span>
                </div>
            </div>

            <div style="text-align: center; margin-top: 32px;">
                <p style="color: #3d5040; font-size: 12px; margin: 0;">Little Spirits · littlespirits.ru</p>
            </div>
        </div>
    </body>
    </html>
    """

    text_body = f"""Новый заказ Little Spirits — {order_time}

ПОКУПАТЕЛЬ:
Имя: {name}
Телефон: {phone}
Email: {email or '—'}
Адрес: {address}
{('Комментарий: ' + comment) if comment else ''}

ТОВАРЫ:
""" + "\n".join([f"  {i.get('emoji', '')} {i.get('name', '')} × {i.get('qty', 1)} = {i.get('price', 0) * i.get('qty', 1):,} ₽" for i in items]) + f"""

ИТОГО: {total:,} ₽
"""

    if not notify_email or not smtp_user or not smtp_pass:
        print(f"[ORDER] Новый заказ (email не настроен): {name} | {phone} | {total:,} ₽")
        return {
            "statusCode": 200,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"ok": True, "message": "Заказ принят (уведомление в логах)"}),
        }

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"🌿 Новый заказ Little Spirits — {name} — {total:,} ₽"
    msg["From"] = smtp_user
    msg["To"] = notify_email
    msg["Reply-To"] = email if email else smtp_user

    msg.attach(MIMEText(text_body, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_pass)
        server.sendmail(smtp_user, notify_email, msg.as_string())

    print(f"[ORDER] Заказ отправлен: {name} | {phone} | {total:,} ₽ → {notify_email}")

    return {
        "statusCode": 200,
        "headers": {**cors_headers, "Content-Type": "application/json"},
        "body": json.dumps({"ok": True, "message": "Заказ принят и отправлен на почту"}),
    }
