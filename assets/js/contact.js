document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var destination = "gamba0412@gmail.com";

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var company = form.company.value.trim();
    var email = form.email.value.trim();
    var tel = form.tel.value.trim();
    var type = form.type.value;
    var message = form.message.value.trim();

    var bodyLines = [
      "お名前: " + name,
      "会社名/屋号: " + (company || "-"),
      "メールアドレス: " + email,
      "お電話番号: " + (tel || "-"),
      "お問い合わせ種別: " + type,
      "",
      "【お問い合わせ内容】",
      message
    ];

    var subject = "【お問い合わせ】" + name + "様より";
    var mailtoUrl =
      "mailto:" + destination +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(bodyLines.join("\n"));

    status.textContent = "メールソフトを起動しています…このまま送信してください。";
    window.location.href = mailtoUrl;
  });
});
