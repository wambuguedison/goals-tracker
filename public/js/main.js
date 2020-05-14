'use strict'
$('#more-details').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever')
  
  /*alert(recipient)
  fetch('http://localhost:3000/view/:' + recipient)
  .then(res => alert(res))
  .catch(e => alert(e))
  */
  let url = window.location.href + 'view/:' + recipient;
  $.ajax({
    type: 'GET',
    url: url
  }).done(function(data){
    let goal = data[0];
    modal.find('.modal-title').text(goal.title);
    modal.find('.view-body').text(goal.description);
    modal.find('.created').text('created :' + goal.created_at.toLocaleString())
  }).fail(function(jqXHR, textStatus){
    alert('Error occurred: ' + textStatus);
  });
  
  var modal = $(this)
  
  modal.find('.modal-body input').val(recipient)
})
