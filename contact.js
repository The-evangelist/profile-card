(function(){
  const form = document.getElementById('contact-form');
  if(!form) return;

  const fields = {
    name: {el: document.getElementById('contact-name'), id:'test-contact-error-name', validator: v => v.trim().length>0, message: 'Full name is required.'},
    email: {el: document.getElementById('contact-email'), id:'test-contact-error-email', validator: v => /^\S+@\S+\.\S+$/.test(v), message: 'Please enter a valid email (name@example.com).'},
    subject: {el: document.getElementById('contact-subject'), id:'test-contact-error-subject', validator: v => v.trim().length>0, message: 'Subject is required.'},
    message: {el: document.getElementById('contact-message'), id:'test-contact-error-message', validator: v => v.trim().length >= 10, message: 'Message must be at least 10 characters.'}
  };

  function showError(fieldKey, text){
    const f = fields[fieldKey];
    const el = document.getElementById(f.id);
    if(el){
      el.textContent = text || '';
      if(text){
        f.el.setAttribute('aria-invalid','true');
      } else {
        f.el.removeAttribute('aria-invalid');
      }
    }
  }

  function validate(){
    let valid = true;
    Object.keys(fields).forEach(k => {
      const value = fields[k].el.value || '';
      const ok = fields[k].validator(value);
      if(!ok){
        showError(k, fields[k].message);
        valid = false;
      } else {
        showError(k, '');
      }
    });
    return valid;
  }

  Object.keys(fields).forEach(k => {
    fields[k].el.addEventListener('blur', () => {
      const value = fields[k].el.value || '';
      const ok = fields[k].validator(value);
      showError(k, ok ? '' : fields[k].message);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const successEl = document.getElementById('contact-success');
    if(validate()){
      successEl.hidden = false;
      Object.keys(fields).forEach(k => { fields[k].el.value = ''; showError(k,''); });
      successEl.focus && successEl.focus();
    } else {
      successEl.hidden = true;
      for(const k of Object.keys(fields)){
        if(fields[k].el.getAttribute('aria-invalid') === 'true'){
          fields[k].el.focus();
          break;
        }
      }
    }
  });
})();