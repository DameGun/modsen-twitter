import { useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { CustomInput, FlexContainer, FormField, Heading4, StyledButton } from '@/components/ui';
import { ModalContext } from '@/components/ui/Modal/context';
import { TWEET_CONTENT_LENGTH_CONSTRAINT, TWEET_MEDIA_LENGTH_CONSTRAINT } from '@/constants/tweet';
import { ValidationErrorsText } from '@/constants/validation';
import { useAppSelector } from '@/hooks/store';
import { useQueryWithLoading } from '@/hooks/useQueryWithLoading';
import { useCreateTweetMutation } from '@/services/store/tweets/createTweet';
import { selectCurrentUser } from '@/services/store/user';
import type { ImageWithKey } from '@/types/image';
import type { ManualLoadingHandleProps } from '@/types/loader';
import type { CreateTweetFormType, TweetDoc } from '@/types/tweet';
import { withLoader } from '@/utils/withLoader';

import { MediaWrapper, MediaWrapperInner } from './styled';
import { createTweetValidationSchema } from './validation';

import { ImageEditButton } from '../ImageEditButton';
import { ImagePreview } from '../ImagePreview';
import { UserAvatar } from '../UserAvatar';

function BaseCreateTweetForm({ handleLoading }: ManualLoadingHandleProps) {
  const currentUser = useAppSelector(selectCurrentUser);
  const [createTweet, { isLoading }] = useCreateTweetMutation();
  const { handleClose } = useContext(ModalContext);
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
    <FlexContainer
      gap='sm'
      fullWidth
      as='form'
      onSubmit={handleClose(handleSubmit(handleFormSubmit))}
    >
      <FlexContainer>
        <UserAvatar url={currentUser.avatarUrl} />
      </FlexContainer>
      <FlexContainer direction='column' fullWidth>
        <CustomInput
          asTextArea
          maxLength={TWEET_CONTENT_LENGTH_CONSTRAINT}
          placeholder='Whats happening?'
          autoResize
          variant='unstyled'
          {...register('content')}
        />
        <FormField errorText={errors.media?.message}>
          {imagesList && imagesList.length > 0 && (
            <MediaWrapper>
              <MediaWrapperInner gap='sm'>
                {imagesList.map((image) => (
                  <ImagePreview key={image.id} {...image} handleDelete={handleImageRemove} />
                ))}
              </MediaWrapperInner>
            </MediaWrapper>
          )}
        </FormField>
        <FlexContainer justify='space-between'>
          <ImageEditButton
            handleChange={handleImageChange}
            handleError={handleImageError}
            size='sm'
          />
          <StyledButton type='submit' isDisabled={!isValid} variant='filled'>
            <Heading4>Post</Heading4>
          </StyledButton>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
}

export const CreateTweetForm = withLoader(BaseCreateTweetForm);
