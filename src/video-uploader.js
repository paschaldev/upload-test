import tus from 'tus-js-client'

const input = $("#uploadInput")

const $progress = $(".progress")

input.on("change", function(e) {
    // Get the selected file from the input element
    var file = e.target.files[0]

    // Create a new tus upload
    var upload = new tus.Upload(file, {
        endpoint: "https://localhost:9000/uploads/",
        retryDelays: [0, 1000, 3000, 5000],
        chunkSize: 30000000,
        headers:{

            "Upload-Concat": "partial"
        },
        metadata: {
            filename: file.name,
            filetype: file.type
        },
        onError: function(error) {
            console.log("Failed because: " + error)
        },
        onProgress: function(bytesUploaded, bytesTotal) {
            var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
            console.log(percentage + "%")

            $progress.text( percentage + "%" );
        },
        onSuccess: function() {

            console.log("Download %s from %s", upload.file.name, upload.url)
        }
    })

    // Start the upload
    upload.start()
})