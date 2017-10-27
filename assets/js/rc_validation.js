(function($) {

    function isFieldValid(fieldElem, regex) {
        let val = fieldElem.val();
        if (regex) {
            regexArr = regex.split('/');
            return new RegExp(regexArr[1], regexArr[2]).test(val);
        } else {
            return !!val.trim()
        }
    }

    // Generic Fn to validate SELECT field errors
    function validateSelect(elem) {
        let isValid = isFieldValid(elem);
        if (isValid) {
            elem.prev('.dk-select').removeClass('form__select--invalid rc_error');
        } else {
            elem.prev('.dk-select').addClass('form__select--invalid rc_error');
        }
        return isValid;
    }

    // Generic Fn to validate INPUT field errors
    function validateField(elem, regex) {
        let isValid = isFieldValid(elem, regex);
        if (isValid) {
            elem.removeClass('form__input--invalid rc_error');
        } else {
            elem.addClass('form__input--invalid rc_error');
        }
        return isValid;
    }

    function addValidations(form, submitButton) {
        let fieldsObj = {
            errors: [],
            fields: [],
            isFilled: function() {
                let validation = this.fields.map(function(el) {
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
                    }else{
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
                    }else{
                        submitButton.prop('disabled', true);
                    }                    
                });

                fieldsObj.fields.push(validationObj);
            });

        function createValidation(elementType, i, el){
            let jElem = $(el),
                fieldObj = {
                    field: jElem,
                    field_parent: jElem.parent(),
                    validationMessage: jElem.data("message"),
                    validate: function() {
                        let isValid = isFieldValid(this.field, this.field.data('regex')),
                            errorElem = $('<p>', {class:'has_error', text: this.validationMessage}),
                            jError = this.field_parent.find('.has_error');
                        
                        fieldsObj.errors = fieldsObj.errors.filter(x => x !== this.validationMessage)
                        if (isValid) {
                            if (elementType == 'input') { this.field.removeClass('form__input--invalid rc_error'); };
                            if (elementType == 'select') { this.field.prev('.dk-select').removeClass('form__select--invalid rc_error'); };

                            jError.remove();
                        } else {
                            if (elementType == 'input') { this.field.addClass('form__input--invalid rc_error'); };
                            if (elementType == 'select') { this.field.prev('.dk-select').addClass('form__select--invalid rc_error'); };
                            
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
