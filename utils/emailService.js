const transporter = require('../config/email');

const sendPasswordEmail = async (user) => {
  const emailTemplate = `
    <h1>Chào mừng, ${user.username}!</h1>
    <p>Tài khoản của bạn đã được tạo thành công trong hệ thống.</p>
    
    <div style="background-color: #f0f0f0; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <h3>Thông tin đăng nhập:</h3>
      <p><strong>Tên đăng nhập:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Mật khẩu tạm:</strong> <code style="background-color: #fff; padding: 5px; border-radius: 3px;">${user.password}</code></p>
      <p><strong>Vai trò:</strong> ${user.role}</p>
    </div>
    
    <p style="color: #d32f2f;">⚠️ Vui lòng đổi mật khẩu này ngay khi lần đầu tiên đăng nhập để bảo vệ tài khoản của bạn.</p>
    
    <p>Nếu bạn không tạo tài khoản này, vui lòng liên hệ với bộ phận hỗ trợ.</p>
    
    <hr>
    <p style="color: #666; font-size: 12px;">Đây là email tự động, vui lòng không trả lời.</p>
  `;

  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@nnptud.com',
      to: user.email,
      subject: `[NNPTUD-C2] Tài khoản của bạn đã được tạo - Mật khẩu tạm`,
      html: emailTemplate
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${user.email} - Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Failed to send email to ${user.email}:`, error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendPasswordEmail };
