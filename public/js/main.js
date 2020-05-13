'use strict'
$('#more-details').on('show.bs.modal', function(event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever')
  
  /*alert(recipient)
  fetch('http://localhost:3000/view/:' + recipient)
  .then(res => alert(res))
  .catch(e => alert(e))
  */
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/view/:' + recipient
  }).done(function(data){
    let goal = data[0];
    modal.find('.modal-title').text(goal.title);
    modal.find('.view-body').text(goal.description);
    modal.find('.created').text('created :' + goal.created_at.toLocaleString())
  }).fail(function(jqXHR, textStatus){
    alert('Error occurred: ');
  });
  
  var modal = $(this)
  
  modal.find('.modal-body input').val(recipient)
})
