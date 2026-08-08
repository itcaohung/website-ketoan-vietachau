document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  function closeNav() {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
  }

  navToggle.addEventListener('click', function () {
    mainNav.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var hash = link.getAttribute('href');
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      if (hash === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      history.replaceState(null, '', window.location.pathname + window.location.search);
    });
  });

  var navLinks = mainNav.querySelectorAll('a[href^="#"]');
  var sections = [];
  navLinks.forEach(function (link) {
    var target = document.querySelector(link.getAttribute('href'));
    if (target) sections.push({ link: link, target: target });
  });

  function setActive() {
    var pos = window.scrollY + 120;
    var current = null;
    sections.forEach(function (item) {
      if (pos >= item.target.offsetTop) current = item.link;
    });
    navLinks.forEach(function (l) { l.classList.remove('active'); });
    if (current) current.classList.add('active');
  }

  window.addEventListener('scroll', setActive);
  setActive();

  var backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  document.querySelectorAll('.contact-form, .hero-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var phone = form.querySelector('[name="phone"]').value.trim();
      var service = form.querySelector('[name="service"]').value;
      var messageInput = form.querySelector('[name="message"]');
      var message = messageInput ? messageInput.value.trim() : '';
      var subject = encodeURIComponent('Đăng ký tư vấn dịch vụ - ' + service);
      var body = encodeURIComponent(
        'Họ và tên: ' + name + '\n' +
        'Số điện thoại: ' + phone + '\n' +
        'Dịch vụ quan tâm: ' + service + '\n' +
        'Nội dung: ' + message
      );
      window.location.href = 'mailto:ketoanvietachau@gmail.com?subject=' + subject + '&body=' + body;
      var note = form.querySelector('.form-note');
      note.textContent = 'Cảm ơn bạn! Trình duyệt sẽ mở ứng dụng email để gửi yêu cầu. Hoặc gọi ngay hotline 0919 996 113 để được hỗ trợ nhanh nhất.';
      note.classList.add('show');
      form.reset();
    });
  });
});
