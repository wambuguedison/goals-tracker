'use strict'
$('#more-details').on('show.bs.modal', function(event) {
  let button = $(event.relatedTarget) // Button that triggered the modal
  let recipient = button.data('whatever')
  
  let url = window.location.href + 'view/:' + recipient;
  $.ajax({
    type: 'GET',
    url: url
  }).done(function(data){
    let goal = data[0];
    modal.find('.modal-title').text(goal.title);
    modal.find('.view-body').text(goal.description);
    modal.find('.created').text('Created on : ' + goal.created_at);
    modal.find('.edit').attr('href', '/edit/:' + goal._id);
    modal.find('.delete').attr('href', '/delete/:' + goal._id);
  }).fail(function(jqXHR, textStatus){
    alert('Error occurred: ' + textStatus);
  });
  
  var modal = $(this)
  
  modal.find('.modal-body input').val(recipient)
})

const delete_all_no = () => {
  let delete_conf = document.getElementById("delete-alert");
  delete_conf.style.setProperty('display','none')
}

const delete_all_conf = () => {
  let delete_conf = document.getElementById("delete-alert");
  delete_conf.style.setProperty('display','block');
}

const delete_all_true = () => {
  let url = window.location.href + 'delete_all'
  let delete_conf = document.getElementById("delete-alert");
  delete_conf.style.setProperty('display','none');
  let deleted_goals = document.getElementById("deleted-goals");
  deleted_goals.style.setProperty('display','block')
  
  fetch(url, {
      method: 'DELETE'
    }
  ).then(res => res.text())
  .then(data => {
    $('.goals').html('')
    let goals = Number(data) > 1 ? ' goals' : ' goal'
    deleted_goals.innerHTML = data + goals + ' deleted!';
    setTimeout(() => {
      deleted_goals.style.setProperty('display','none')
    }, 3000)
    setTimeout(() => {
      window.location.href = window.location.href;
    }, 3000)
  }).catch(err => alert(err))
}
