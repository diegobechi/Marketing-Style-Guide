(function($) {

    function isFieldValid(fieldElem, regex) {
        var val = fieldElem.val();
        if (regex) {
            regexArr = regex.split('/');
            return new RegExp(regexArr[1], regexArr[2]).test(val);
        } else {
            return !!val.trim();
        }
    }

    // Generic Fn to validate SELECT field errors
    function validateSelect(elem) {
        var isValid = isFieldValid(elem);
        if (isValid) {
            elem.prev('.dk-select').removeClass('rc_form__select--invalid');
        } else {
            elem.prev('.dk-select').addClass('rc_form__select--invalid');
        }
        return isValid;
    }

    // Generic Fn to validate INPUT field errors
    function validateField(elem, regex) {
        var isValid = isFieldValid(elem, regex);
        if (isValid) {
            elem.removeClass('rc_form__input--invalid');
        } else {
            elem.addClass('rc_form__input--invalid');
        }
        return isValid;
    }

    function addValidations(form, submitButton) {
        var fieldsObj = {
            errors: [],
            fields: [],
            isFilled: function() {
                var validation = this.fields.map(function(el) {
                    return el.isFilled();
                });
                return !validation.some(function(x) {
                    return x === false;
                });
            }
        };

        //find all required INPUT fields and add validations
        form.find('input[required]')
            .each(function(i, el) {                
                var validationObj = createValidation('input', i, el);

                validationObj.field.blur(function() {
                    validationObj.validate();
                    if (fieldsObj.isFilled() && !fieldsObj.errors.length){
                        submitButton.prop('disabled', false);
                    } else {
                        submitButton.prop('disabled', true);
                    }                    
                });

                fieldsObj.fields.push(validationObj);
            });

        //find all required SELECT fields and add validations
        form.find('select[required]')
            .each(function(i, el) {                
                var validationObj = createValidation('input', i, el);

                validationObj.field.change(function() {
                    validationObj.validate();
                    if (fieldsObj.isFilled() && !fieldsObj.errors.length){
                        submitButton.prop('disabled', false);
                    } else {
                        submitButton.prop('disabled', true);
                    }                    
                });

                fieldsObj.fields.push(validationObj);
            });

        function createValidation(elementType, i, el){
            var jElem = $(el),
                fieldObj = {
                    field: jElem,
                    field_parent: jElem.parent(),
                    validationMessage: jElem.data("message"),
                    validate: function() {
                        var isValid = isFieldValid(this.field, this.field.data('regex')),
                            errorElem = $('<p>', {class:'has_error', text: this.validationMessage}),
                            jError = this.field_parent.find('.has_error');
                        
                        fieldsObj.errors = fieldsObj.errors.filter(function(x){ x !== this.validationMessage })
                        if (isValid) {
                            if (elementType == 'input') { this.field.removeClass('rc_form__input--invalid'); };
                            if (elementType == 'select') { this.field.prev('.dk-select').removeClass('rc_form__select--invalid'); };

                            jError.remove();
                        } else {
                            if (elementType == 'input') { this.field.addClass('rc_form__input--invalid'); };
                            if (elementType == 'select') { this.field.prev('.dk-select').addClass('rc_form__select--invalid'); };
                            
                            if(jError.length <= 0) this.field_parent.append(errorElem);
                            fieldsObj.errors.push(this.validationMessage);
                        }
                        return isValid;
                    },
                    isFilled: function (){
                        return !!this.field.val();
                    }
                }
            return  fieldObj;
        }
    }

    recharge.validations = {
        addValidations: addValidations,
        validateSelect: validateSelect,
        validateField: validateField,
    }
})(jQuery); 
