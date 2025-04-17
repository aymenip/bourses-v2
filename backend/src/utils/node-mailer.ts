import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "aymenhadouara@gmail.com", // your email
    pass: "rlod pksj cxum bzou", // the app password you generated, paste without spaces
  },
  secure: true,
  port: 465,
});

export async function notifyUser(
  to: string,
  subject: string,
  text?: string,
  html?: string
) {
  try {
    await transporter.sendMail({
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
  } catch (e) {
    console.log("Error while sending email", e);
  }
}

export async function notifyAccountCreated(
  to: string,
  firstname: string,
  lastname: string,
  password: string
) {
  try {
    const subject =
      "[منصة التربصات][المركز الجامعي الشريف بوشوشة أفلو] - حساب جديد";

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>حساب جديد</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #6a0dad;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        .credentials {
          background-color: #f0e6ff;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
          border-left: 4px solid #6a0dad;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
        .label {
          font-weight: bold;
          color: #6a0dad;
        }
        h1 {
          margin: 0;
          font-size: 24px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>مرحباً ${firstname} ${lastname}</h1>
      </div>
      <div class="content">
        <p>تم إنشاء حسابك بنجاح على منصة التربصات الخاصة بالمركز الجامعي الشريف بوشوشة أفلو.</p>
        
        <div class="credentials">
          <p><span class="label">البريد الإلكتروني:</span> ${to}</p>
          <p><span class="label">كلمة المرور:</span> ${password}</p>
        </div>
        
        <p>يمكنك الآن تسجيل الدخول باستخدام هذه المعلومات.</p>
        <p>يجب تغيير كلمة المرور بعد أول تسجيل دخول.</p>
        <p>رابط المنصة: <a href='https://bourse.cu-aflou.edu.dz/' target='_blank'>هنا</a></p>
        <div class="footer">
          <p>هذه رسالة تلقائية، لا ترد عليها.</p>
          <p>© ${new Date().getFullYear()} المركز الجامعي الشريف بوشوشة أفلو</p>
        </div>
      </div>
    </body>
    </html>
    `;

    await transporter.sendMail({
      to: to,
      subject: subject,
      text: `مرحباً ${firstname} ${lastname},\n\nتم إنشاء حسابك بنجاح.\n\nالبريد الإلكتروني: ${to}\nكلمة المرور: ${password}\n\nيمكنك الآن تسجيل الدخول باستخدام هذه المعلومات.\nنوصي بتغيير كلمة المرور بعد أول تسجيل دخول.\n\nهذه رسالة تلقائية، لا ترد عليها.`,
      html: htmlTemplate,
    });
  } catch (e) {
    console.error("Error while sending account creation email", e);
    throw e; // Consider re-throwing or handling differently based on your needs
  }
}

export async function notifySubmissionSent(
  to: string,
  submissionData: string,
  formTitle: string
) {
  try {
    const subject =
      "[منصة التربصات][المركز الجامعي الشريف بوشوشة أفلو] - تم إرسال التقديم";

    // Extract key information from submissionData (assuming it's a JSON string)
    let extractedInfo = [];
    try {
      const data = JSON.parse(submissionData);
      // Extract 4-5 important fields - adjust these based on your actual data structure
      extractedInfo = [
        { label: "نوع التربص", value: formTitle || "غير محدد" },
        { label: "المؤسسة", value: "المركز الجامعي الشريف بوشوشة أفلو" },
        { label: "الحالة", value: data.status || "في الانتظار" },
      ];
    } catch (e) {
      // If parsing fails, just show a truncated version of the raw data
      extractedInfo = [
        {
          label: "معلومات التقديم",
          value:
            submissionData.substring(0, 100) +
            (submissionData.length > 100 ? "..." : ""),
        },
      ];
    }

    const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>تم إرسال التقديم</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #6a0dad;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 8px 8px;
        }
        .submission-info {
          background-color: #f0e6ff;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
          border-left: 4px solid #6a0dad;
        }
        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #777;
          text-align: center;
        }
        .label {
          font-weight: bold;
          color: #6a0dad;
        }
        h1 {
          margin: 0;
          font-size: 24px;
        }
        .info-item {
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>تم استلام تقديمك</h1>
      </div>
      <div class="content">
        <p>تم استلام تقديمك بنجاح على منصة التربصات الخاصة بالمركز الجامعي الشريف بوشوشة أفلو.</p>
        
        <div class="submission-info">
          ${extractedInfo
            .map(
              (item) => `
            <div class="info-item">
              <span class="label">${item.label}:</span> ${item.value}
            </div>
          `
            )
            .join("")}
        </div>
        
        <p>سيتم مراجعة طلبك وإعلامك بأي تحديثات.</p>
        <div class="footer">
          <p>هذه رسالة تلقائية، لا ترد عليها.</p>
          <p>© ${new Date().getFullYear()} المركز الجامعي الشريف بوشوشة أفلو</p>
        </div>
      </div>
    </body>
    </html>
    `;

    // Plain text version
    const textContent = `تم استلام تقديمك بنجاح على منصة التربصات.\n\nمعلومات التقديم:\n${extractedInfo
      .map((item) => `${item.label}: ${item.value}`)
      .join(
        "\n"
      )}\n\nسيتم مراجعة طلبك وإعلامك بأي تحديثات.\n\nهذه رسالة تلقائية، لا ترد عليها.`;

    await transporter.sendMail({
      to: to,
      subject: subject,
      text: textContent,
      html: htmlTemplate,
    });
  } catch (e) {
    console.error("Error while sending submission confirmation email", e);
    throw e;
  }
}
