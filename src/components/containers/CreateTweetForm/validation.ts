import * as yup from 'yup';

import { TWEET_CONTENT_LENGTH_CONSTRAINT, TWEET_MEDIA_LENGTH_CONSTRAINT } from '@/constants/tweet';
import { ValidationErrorsText } from '@/constants/validation';

export const createTweetValidationSchema = yup.object().shape({
  media: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          id: yup.number().required(),
          url: yup.string().required(),
        })
        .required()
    )
    .max(
      TWEET_MEDIA_LENGTH_CONSTRAINT,
      ValidationErrorsText.ItemsConstraint(TWEET_MEDIA_LENGTH_CONSTRAINT)
    )
    .optional(),
  content: yup
    .string()
    .max(
      TWEET_CONTENT_LENGTH_CONSTRAINT,
      ValidationErrorsText.LengthConstraint(TWEET_CONTENT_LENGTH_CONSTRAINT)
    )
    .trim()
    .optional()
    .when('media', {
      is: (media: string[]) => media.length === 0,
      then: (schema) => schema.required(ValidationErrorsText.Required),
    }),
});
