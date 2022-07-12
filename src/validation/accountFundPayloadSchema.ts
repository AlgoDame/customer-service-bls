import Joi from "joi";

export const accountFundSchema = Joi.object().keys({
    account_id: Joi.string().required(),
    amount: Joi.number().required()

});
