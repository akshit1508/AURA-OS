package com.example.portfolio_backend.service;

import com.example.portfolio_backend.entity.Contact;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmails(Contact contact) {

        sendConfirmationToUser(contact);

        sendNotificationToAkshit(contact);
    }

    // =========================================================
    // USER CONFIRMATION EMAIL
    // =========================================================

    private void sendConfirmationToUser(Contact contact) {

        try {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(contact.getEmail());

            helper.setSubject(
                    "Transmission Received — Akshit Bhandari"
            );

            String name =
                    HtmlUtils.htmlEscape(contact.getName());

            String subject =
                    HtmlUtils.htmlEscape(contact.getSubject());

            String contactMessage =
                    HtmlUtils.htmlEscape(contact.getMessage());

            String html = """
                    <!DOCTYPE html>
                    <html>
                    <body style="
                        margin:0;
                        padding:0;
                        background:#070707;
                        font-family:Arial,Helvetica,sans-serif;
                        color:#ffffff;
                    ">

                        <div style="
                            width:100%%;
                            padding:40px 15px;
                            background:#070707;
                        ">

                            <div style="
                                max-width:620px;
                                margin:0 auto;
                                background:#0d0d0d;
                                border:1px solid #242424;
                                border-radius:20px;
                                overflow:hidden;
                            ">

                                <!-- HEADER -->

                                <div style="
                                    padding:28px 32px;
                                    border-bottom:1px solid #242424;
                                ">

                                    <div style="
                                        font-size:20px;
                                        font-weight:bold;
                                        letter-spacing:2px;
                                    ">
                                        AURA
                                        <span style="color:#3b82f6;">
                                            OS
                                        </span>
                                    </div>

                                    <div style="
                                        margin-top:8px;
                                        font-size:10px;
                                        letter-spacing:3px;
                                        color:#3b82f6;
                                        text-transform:uppercase;
                                    ">
                                        Communication System
                                    </div>

                                </div>


                                <!-- CONTENT -->

                                <div style="padding:32px;">

                                    <div style="
                                        font-size:10px;
                                        letter-spacing:3px;
                                        color:#3b82f6;
                                        text-transform:uppercase;
                                    ">
                                        ● Transmission Received
                                    </div>

                                    <h1 style="
                                        margin:14px 0 8px;
                                        font-size:28px;
                                        line-height:1.3;
                                        color:#ffffff;
                                    ">
                                        Message successfully delivered.
                                    </h1>

                                    <p style="
                                        margin:0 0 28px;
                                        font-size:14px;
                                        line-height:1.7;
                                        color:#888888;
                                    ">
                                        Hi {{NAME}}, your message has been
                                        successfully received through the
                                        AURA communication channel.
                                    </p>


                                    <!-- STATUS -->

                                    <div style="
                                        padding:20px;
                                        background:#111111;
                                        border:1px solid #242424;
                                        border-radius:14px;
                                    ">

                                        <div style="
                                            font-size:9px;
                                            letter-spacing:2px;
                                            color:#666666;
                                            text-transform:uppercase;
                                        ">
                                            Transmission Status
                                        </div>

                                        <div style="
                                            margin-top:10px;
                                            font-size:14px;
                                            color:#22c55e;
                                        ">
                                            ● Successfully Received
                                        </div>

                                    </div>


                                    <!-- MESSAGE DETAILS -->

                                    <div style="
                                        margin-top:28px;
                                    ">

                                        <div style="
                                            font-size:9px;
                                            letter-spacing:2px;
                                            color:#666666;
                                            text-transform:uppercase;
                                            margin-bottom:10px;
                                        ">
                                            Subject
                                        </div>

                                        <div style="
                                            padding:16px;
                                            background:#111111;
                                            border:1px solid #242424;
                                            border-radius:10px;
                                            font-size:14px;
                                            color:#ffffff;
                                        ">
                                            {{SUBJECT}}
                                        </div>

                                    </div>


                                    <div style="
                                        margin-top:22px;
                                    ">

                                        <div style="
                                            font-size:9px;
                                            letter-spacing:2px;
                                            color:#666666;
                                            text-transform:uppercase;
                                            margin-bottom:10px;
                                        ">
                                            Your Message
                                        </div>

                                        <div style="
                                            padding:18px;
                                            background:#111111;
                                            border-left:2px solid #3b82f6;
                                            border-radius:8px;
                                            font-size:14px;
                                            line-height:1.7;
                                            color:#cccccc;
                                        ">
                                            {{MESSAGE}}
                                        </div>

                                    </div>


                                    <!-- RESPONSE -->

                                    <p style="
                                        margin-top:30px;
                                        font-size:14px;
                                        line-height:1.7;
                                        color:#999999;
                                    ">
                                        I'll review your message and connect
                                        with you shortly.
                                    </p>

                                </div>


                                <!-- FOOTER -->

                                <div style="
                                    padding:22px 32px;
                                    border-top:1px solid #242424;
                                    font-size:9px;
                                    letter-spacing:2px;
                                    color:#555555;
                                    text-transform:uppercase;
                                ">
                                    AURA / COMMUNICATION
                                </div>

                            </div>

                        </div>

                    </body>
                    </html>
                    """;

            html = html
                    .replace("{{NAME}}", name)
                    .replace("{{SUBJECT}}", subject)
                    .replace("{{MESSAGE}}", contactMessage);

            helper.setText(html, true);

            mailSender.send(message);

        } catch (MessagingException e) {

            throw new RuntimeException(
                    "Failed to send confirmation email",
                    e
            );
        }
    }


    // AKSHIT NOTIFICATION EMAIL

    private void sendNotificationToAkshit(Contact contact) {

        try {

            MimeMessage message = mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            // YOUR EMAIL
            helper.setTo("bhandariakshit137@gmail.com");

            helper.setSubject(
                    "New Portfolio Contact — "
                            + contact.getName()
            );

            String name =
                    HtmlUtils.htmlEscape(contact.getName());

            String email =
                    HtmlUtils.htmlEscape(contact.getEmail());

            String subject =
                    HtmlUtils.htmlEscape(contact.getSubject());

            String contactMessage =
                    HtmlUtils.htmlEscape(contact.getMessage());

            String html = """
                    <!DOCTYPE html>
                    <html>
                    <body style="
                        margin:0;
                        padding:0;
                        background:#070707;
                        font-family:Arial,Helvetica,sans-serif;
                        color:#ffffff;
                    ">

                        <div style="
                            width:100%%;
                            padding:40px 15px;
                            background:#070707;
                        ">

                            <div style="
                                max-width:620px;
                                margin:0 auto;
                                background:#0d0d0d;
                                border:1px solid #242424;
                                border-radius:20px;
                                overflow:hidden;
                            ">

                                <!-- HEADER -->

                                <div style="
                                    padding:28px 32px;
                                    border-bottom:1px solid #242424;
                                ">

                                    <div style="
                                        font-size:20px;
                                        font-weight:bold;
                                        letter-spacing:2px;
                                    ">
                                        AURA
                                        <span style="color:#3b82f6;">
                                            OS
                                        </span>
                                    </div>

                                    <div style="
                                        margin-top:8px;
                                        font-size:10px;
                                        letter-spacing:3px;
                                        color:#3b82f6;
                                        text-transform:uppercase;
                                    ">
                                        Communication System
                                    </div>

                                </div>


                                <!-- CONTENT -->

                                <div style="padding:32px;">

                                    <div style="
                                        font-size:10px;
                                        letter-spacing:3px;
                                        color:#3b82f6;
                                        text-transform:uppercase;
                                    ">
                                        ● New Contact Detected
                                    </div>

                                    <h1 style="
                                        margin:14px 0 8px;
                                        font-size:28px;
                                        line-height:1.3;
                                        color:#ffffff;
                                    ">
                                        New communication received.
                                    </h1>

                                    <p style="
                                        margin:0 0 28px;
                                        font-size:14px;
                                        line-height:1.7;
                                        color:#888888;
                                    ">
                                        Someone has reached out through your
                                        portfolio communication channel.
                                    </p>


                                    <!-- CONTACT CARD -->

                                    <div style="
                                        background:#111111;
                                        border:1px solid #242424;
                                        border-radius:14px;
                                        padding:22px;
                                    ">

                                        <div style="
                                            margin-bottom:18px;
                                        ">

                                            <div style="
                                                font-size:9px;
                                                letter-spacing:2px;
                                                color:#666666;
                                                text-transform:uppercase;
                                            ">
                                                Name
                                            </div>

                                            <div style="
                                                margin-top:6px;
                                                font-size:15px;
                                                color:#ffffff;
                                            ">
                                                {{NAME}}
                                            </div>

                                        </div>


                                        <div style="
                                            margin-bottom:18px;
                                        ">

                                            <div style="
                                                font-size:9px;
                                                letter-spacing:2px;
                                                color:#666666;
                                                text-transform:uppercase;
                                            ">
                                                Email
                                            </div>

                                            <div style="
                                                margin-top:6px;
                                                font-size:15px;
                                                color:#60a5fa;
                                            ">
                                                {{EMAIL}}
                                            </div>

                                        </div>


                                        <div>

                                            <div style="
                                                font-size:9px;
                                                letter-spacing:2px;
                                                color:#666666;
                                                text-transform:uppercase;
                                            ">
                                                Subject
                                            </div>

                                            <div style="
                                                margin-top:6px;
                                                font-size:15px;
                                                color:#ffffff;
                                            ">
                                                {{SUBJECT}}
                                            </div>

                                        </div>

                                    </div>


                                    <!-- MESSAGE -->

                                    <div style="
                                        margin-top:28px;
                                    ">

                                        <div style="
                                            font-size:9px;
                                            letter-spacing:2px;
                                            color:#666666;
                                            text-transform:uppercase;
                                            margin-bottom:10px;
                                        ">
                                            Message
                                        </div>

                                        <div style="
                                            padding:18px;
                                            background:#111111;
                                            border-left:2px solid #3b82f6;
                                            border-radius:8px;
                                            font-size:14px;
                                            line-height:1.7;
                                            color:#cccccc;
                                        ">
                                            {{MESSAGE}}
                                        </div>

                                    </div>


                                    <!-- STATUS -->

                                    <div style="
                                        margin-top:30px;
                                        padding-top:22px;
                                        border-top:1px solid #242424;
                                    ">

                                        <span style="
                                            color:#22c55e;
                                            font-size:11px;
                                            letter-spacing:2px;
                                        ">
                                            ● SYSTEM RECEIVED
                                        </span>

                                    </div>

                                </div>


                                <!-- FOOTER -->

                                <div style="
                                    padding:22px 32px;
                                    border-top:1px solid #242424;
                                    font-size:9px;
                                    letter-spacing:2px;
                                    color:#555555;
                                    text-transform:uppercase;
                                ">
                                    AURA / COMMUNICATION
                                </div>

                            </div>

                        </div>

                    </body>
                    </html>
                    """;

            html = html
                    .replace("{{NAME}}", name)
                    .replace("{{EMAIL}}", email)
                    .replace("{{SUBJECT}}", subject)
                    .replace("{{MESSAGE}}", contactMessage);

            helper.setText(html, true);

            mailSender.send(message);

        } catch (MessagingException e) {

            throw new RuntimeException(
                    "Failed to send notification email",
                    e
            );
        }
    }
}