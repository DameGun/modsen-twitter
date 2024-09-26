import { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  TWEET_CONTENT_LENGTH_CONSTRAINT,
  TWEET_MEDIA_LENGTH_CONSTRAINT,
  useCreateTweetMutation,
} from '@/entities/tweet';
import type { CreateTweetFormType, TweetDoc } from '@/entities/tweet/types';
import { Avatar, selectCurrentUser } from '@/entities/user';
import { ImageEditButton, ImagePreview } from '@/features/image';
import { ValidationErrorsText } from '@/shared/constants/validation';
import { useAppSelector } from '@/shared/lib/store';
import { useQueryWithLoading } from '@/shared/lib/useQueryWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ImageWithKey } from '@/shared/types/image';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import * as Components from '@/shared/ui';

import { MediaWrapper, MediaWrapperInner } from './styled';

import { createTweetValidationSchema } from '../model/validation';

function BaseCreateTweetForm({ handleLoading }: ManualLoadingHandleProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const [createTweet, { isLoading }] = useCreateTweetMutation();
  const { handleClose } = useContext(Components.ModalContext);
  useQueryWithLoading({ isLoading, handleLoading });

  const {
    setValue,
    setError,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<CreateTweetFormType>({
    mode: 'onChange',
    defaultValues: {
      media: [],
    },
    resolver: yupResolver(createTweetValidationSchema),
  });
  const [imagesList, setImagesList] = useState<ImageWithKey[]>([]);

  const handleImageError = useCallback((e: unknown) => {
    const { message } = e as Error;
    setError('media', { message });
  }, []);

  const handleImageChange = useCallback((url: string) => {
    setImagesList((prev) => {
      if (prev.length < TWEET_MEDIA_LENGTH_CONSTRAINT) {
        const newItems = [...prev, { id: Date.now(), url }];

        setValue('media', newItems, { shouldValidate: true });

        return newItems;
      } else {
        handleImageError({
          message: ValidationErrorsText.ItemsConstraint(TWEET_MEDIA_LENGTH_CONSTRAINT),
        });
      }

      return prev;
    });
  }, []);

  const handleImageRemove = useCallback((id: number) => {
    setImagesList((prev) => {
      const newItems = prev.filter((image) => image.id !== id);
      setValue('media', newItems, { shouldValidate: true });

      return newItems;
    });
  }, []);

  const handleFormSubmit = async ({ media, content }: CreateTweetFormType) => {
    const createTweetObj: Partial<TweetDoc> = {
      content,
      createdAt: Date.now(),
      author: currentUser.uid,
      likes: [] as string[],
      media: media?.map(({ url }) => url),
    };

    const res = await createTweet(createTweetObj);

    if (res.error) {
      setError('media', { message: 'Error happened while trying to create a tweet' });
    } else {
      reset();
      setImagesList([]);
    }
  };

  return (
    <Components.FlexContainer
      $gap='sm'
      $fullWidth
      as='form'
      onSubmit={handleClose(handleSubmit(handleFormSubmit))}
    >
      <Components.FlexContainer>
        <Avatar url={currentUser.avatarUrl} />
      </Components.FlexContainer>
      <Components.FlexContainer $fullWidth $direction='column'>
        <Components.CustomInput
          asTextArea
          maxLength={TWEET_CONTENT_LENGTH_CONSTRAINT}
          placeholder='Whats happening?'
          autoResize
          variant='unstyled'
          {...register('content')}
        />
        <Components.FormField errorText={errors.media?.message}>
          {imagesList && imagesList.length > 0 && (
            <MediaWrapper>
              <MediaWrapperInner $gap='sm'>
                {imagesList.map((image) => (
                  <ImagePreview key={image.id} {...image} handleDelete={handleImageRemove} />
                ))}
              </MediaWrapperInner>
            </MediaWrapper>
          )}
        </Components.FormField>
        <Components.FlexContainer $justify='space-between'>
          <ImageEditButton
            handleChange={handleImageChange}
            handleError={handleImageError}
            size='sm'
          />
          <Components.StyledButton type='submit' $isDisabled={!isValid} $variant='filled'>
            <Components.Heading4>Post</Components.Heading4>
          </Components.StyledButton>
        </Components.FlexContainer>
      </Components.FlexContainer>
    </Components.FlexContainer>
  );
}

export const CreateTweetForm = withLoader(BaseCreateTweetForm);
