// REST API URL
let address = '/api/Quotes';

// Function to Display Data in Tabular Structure and collect from API
function loadQuotes() {
    // Generate AJAX request for collecting All Quote Details
    $.ajax({
        type: "GET",
        url: address,
        cache: false,
        success: function (data) {
            // Capture the reference of Row
            const dataRow = $("#data_row");

            $(dataRow).empty(); // Empty the content of Previous Row

            if (data.length == 0) { // If there is no data present
                // Prepare a message
                const data = $("<h1>No Quote information</h1>");
                // Add message to dataRow
                data.appendTo(dataRow);
            } else {
                // Iterate all JSON Quote present in data
                $.each(data, function (key, item) {
                    // prepare a row with table column with data 
                    let html = '<div class="col-md-6  mb-3"><div class="card shadow col-md-12">';
                    html += '<div class="card-body">';
                    html += '<h5 class="card-title">' + item.quoteText + '</h5>';
                    html += '<p class="card-text">';
                    let rating = parseInt(item.rating);
                    for (let count = 1; count <= rating; count++) {
                        html += '<i class="fa fa-star" aria-hidden="true"></i>';
                    }
                    for (let count = rating + 1; count <= 5; count++) {
                        html += '<i class="fa fa-star-o" aria-hidden="true"></i>';
                    }
                    html += '</p>';
                    html += '</div>';
                    html += '<div class="row mb-2">';
                    html += '<div class="col-md-6">';
                    html += '<button class="btn btn-info btn-block" onclick="getQuote(' + item.id + ')" data-toggle="modal" data-target="#edit_quote">Edit Quote</button>';
                    html += '</div>';
                    html += '<div class="col-md-6">';
                    html += '<button class="btn btn-danger btn-block" onclick="deleteQuote(' + item.id + ')">Delete Quote</button>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div></div>';
                    dataRow.append(html);
                });
            }
        }
    });
}

// Function to save quote details using API
function saveQuote() {
    // Collect Form Details
    let quote_text = $('#quote_text').val();
    let rating_value = parseInt($('#rating').val());

    // Prepare JSON data for storing 
    let quote = {
        quoteText: quote_text,
        rating: rating_value
    };

    // Request the API for Insertion
    $.ajax({
        type: "POST",
        url: address,
        data: JSON.stringify(quote),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        // Display the appropriate message 
        $("#add_result").html("Quote is Saved");
        // Refresh All Quotes Details
        loadQuotes();
    }).fail(function (xhr, status) {
        // Display the appropriate message 
        $("#add_result").html("Quote is not Saved");
    });
}

// Delete Function for Quote
function deleteQuote(id) {
    // Display a confirm message before generating request of delete
    let result = confirm("Are You Sure to Remove Quote Details?");

    if (result) {
        // Generate Request of API for Delete the Quote Details
        $.ajax({
            type: "DELETE",
            url: address + "/" + id,
        }).done(function (response) {
            // Load Quote Details
            loadQuotes();
        });
    }
}

// Fetch Quote using ID
function getQuote(id) {
    $.ajax({
        type: "GET",
        url: address + "/" + id,
        contentType: "application/json"
    }).done(function (quote) {
        $('#quote_id').val(quote.id);
        $('#quote_text_edit').val(quote.quoteText);
        $('#rating_edit').val(quote.rating);
    });
}

// Function to update quote details using API
function updateQuote() {
    // Collect Form Details
    let quote_id = parseInt($('#quote_id').val());
    let quote_text = $('#quote_text_edit').val();
    let rating_value = parseInt($('#rating_edit').val());

    // Prepare JSON data for storing 
    let quote = {
        id: quote_id,
        quoteText: quote_text,
        rating: rating_value
    };

    // Request the API for Updation
    $.ajax({
        type: "PUT",
        url: address + "/" + quote_id,
        data: JSON.stringify(quote),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        // Display the appropriate message 
        $("#edit_result").html("Quote is Updated");
        // Refresh All Quotes Details
        loadQuotes();
    }).fail(function (xhr, status) {
        // Display the appropriate message 
        $("#edit_result").html("Quote is not Updated");
    });
}