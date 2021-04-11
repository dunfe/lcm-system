import express from 'express';
const router = express.Router();

export const validate = {
    isAlphaNumericOnly : function (input)
    {
        var letterNumberRegex = /^[0-9a-zA-Z]+$/;
        if(input.match(letterNumberRegex))
        {
            return true;
        }
        return false;
    },
    isLongEnough : function (input){
        if(input.length >= 6){
            return true;
        }
        return false;
    },
    isGoodPassword : function (input)
    {
        // at least one number, one lowercase and one uppercase letter
        // at least six characters
        var regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        return regex.test(input);
    } ,
    isSafe: function (input)
    {
        var regex = /([$])/;
        return !regex.test(input);
    }   
}

export default validate;