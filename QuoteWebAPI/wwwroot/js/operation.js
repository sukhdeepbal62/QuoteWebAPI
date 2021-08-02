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
            // Capture the Div Reference
            const dataRow = $("#data_row");
            $(dataRow).empty(); // Empty the content of Div

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
                    html += '</div></div>';  
                    dataRow.append(html);
                });
            }
        }
    });
}