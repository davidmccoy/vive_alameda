// Click event to change project info language

window.onload = function() {
  var spans = document.getElementsByClassName('language-option');
  var clickEvent = function() {
    if (!this.classList.contains('active') && this.id === "espanol") {
      this.classList.add('active');
      document.getElementById('info-espanol').classList.add('active');

      document.getElementById('english').classList.remove('active');
      document.getElementById('info-english').classList.remove('active');
    } else if (!this.classList.contains('active') && this.id === "english") {
      this.classList.add('active');
      document.getElementById('info-english').classList.add('active')

      document.getElementById('espanol').classList.remove('active');
      document.getElementById('info-espanol').classList.remove('active');
    }
  }
  for(i = 0; i < spans.length; i++) {
    spans[i].addEventListener('click', clickEvent)
  }
}
