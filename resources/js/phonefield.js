function phoneMask(fields) {
    var country = document.getElementById('default-phone-country')
        ? document.getElementById('default-phone-country').innerText : null;
    var inputQueries = document.querySelectorAll(fields);
    inputQueries.forEach(function (inputQuery, key) {
        var iti = intlTelInput(inputQuery, {
            hiddenInput: inputQuery.getAttribute('name'),
            class: "form-control",
            formatOnDisplay: true,
            nationalMode: true,
            initialCountry: "auto",
            geoIpLookup: function (success, failure) {
                $.get("https://ipinfo.io", function () {
                }, "jsonp").always(function (resp) {
                    var countryCode = country ? country : (resp && resp.country) ? resp.country : "";
                    success(countryCode);
                })
            }
        });

        addMask(iti, inputQuery);
        $(inputQuery).on("countrychange", function (event) {
            iti.setNumber("");
            addMask(iti, inputQuery);
        });
    });

    function addMask(iti, inputQuery) {
        let selectedCountryData = iti.getSelectedCountryData();
        let newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL);
    }
}

function controlNumber(inputQuery) {
    var iti = intlTelInput(inputQuery, {
        hiddenInput: inputQuery.getAttribute('name'),
        class: "form-control",
        initialCountry: "auto",
        geoIpLookup: function (success, failure) {
            $.get("https://ipinfo.io", function () {
            }, "jsonp").always(function (resp) {
                var countryCode = (resp && resp.country) ? resp.country : "";
                success(countryCode);
            })
        }
    })
    return iti.isValidNumber();
}
