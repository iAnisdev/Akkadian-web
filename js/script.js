$(document).ready(function () {
    let contact_form = $('#contact-form')
    contact_form.submit(function (event) {
        event.preventDefault();
        let name = $('#contact_name').val()
        let email = $('#contact_email').val()
        let subject = $('#contact_subject').val()
        let message = $('#contact_message').val()
        $("#contact_submit").val('Submitting ....');
        $.ajax({
            type: "POST",
            dataType: 'json',
            url: 'https://test.freshchefs.cn/webserv/Email.php',
            data: JSON.stringify({
                type: "AKK",
                info: 'Request From AKK website',
                name,
                email,
                subject,
                message
            }),
            success: function (res) {
                if (res.status == 0) {
                    $('#contact_name').val('')
                    $('#contact_email').val('')
                    $('#contact_subject').val('')
                    $('#contact_message').val('')
                    Swal.fire({
                        title: 'Thank You!',
                        text: `Someone from our team will get back to you on ${email}`,
                        type: 'success',
                        confirmButtonText: 'OK'
                    })
                    $("#contact_submit").val('Send Message');
                } else {
                    Swal.fire({
                        title: `Server Error ${res.status}`,
                        text: res.message,
                        type: 'error',
                        confirmButtonText: 'Cancel'
                    })
                    $("#contact_submit").val('Send Message');
                }
            }
        });
    });
})