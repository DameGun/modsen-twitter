import { forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import {
  Avatar,
  AvatarWrapper,
  BackgroundImage,
  selectCurrentUser,
  updateCurrentUser,
  updateUser,
} from '@/entities/user';
import type { EditUser } from '@/entities/user/types';
import { DateOfBirthControl } from '@/features/user';
import { BIO_LENGTH_CONSTRAINT, FULLNAME_LENGTH_CONSTRAINT } from '@/shared/constants/validation';
import {
  registerManualSetError,
  registerManualSetValue,
  validateFormExceptValues,
} from '@/shared/lib/hookForm';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { useAsyncWithLoading } from '@/shared/lib/useAsyncWithLoading';
import { withLoader } from '@/shared/lib/withLoader';
import type { ManualLoadingHandleProps } from '@/shared/types/loader';
import { Container, CustomInput, FormField, ModalContext } from '@/shared/ui';
import { ImageEdit } from '@/shared/ui/ImageEdit';

import { editProfileValidationSchema } from '../../model/validation';

const BaseEditProfileForm = forwardRef<HTMLFormElement, ManualLoadingHandleProps>(
  function EditProfileForm({ handleLoading }, ref) {
    const dispatch = useAppDispatch();
    const { uid, fullName, bio, dateOfBirth, backgroundImageUrl, avatarUrl } =
      useAppSelector(selectCurrentUser);
    const { handleClose, handleFormValidation } = useContext(ModalContext);
    const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState('');
    const [uploadedBackgroundImageUrl, setUploadedBackgroundImageUrl] = useState('');

    const {
      setError,
      setValue,
      register,
      handleSubmit,
      formState: { errors, isValid },
    } = useForm<EditUser>({
      mode: 'onChange',
      resolver: yupResolver(editProfileValidationSchema),
      resetOptions: { keepErrors: false },
    });

    const { call } = useAsyncWithLoading({
      call: updateUser,
      handleLoading,
    });

    const handleSetValueManually = useCallback(registerManualSetValue(setValue), []);

    const handleErrorManually = useCallback(registerManualSetError(setError), []);

    const handleAvatarUrlChange = (value: string) => {
      handleSetValueManually('avatarUrl')(value);
      setUploadedAvatarUrl(value);
    };

    const handleBackgroundImageUrlChange = (value: string) => {
      handleSetValueManually('backgroundImageUrl')(value);
      setUploadedBackgroundImageUrl(value);
    };

    const handleFormSubmit = async (userObj: Partial<EditUser>) => {
      const updatedUser = await call({ uid, userObj });

      if (updatedUser) dispatch(updateCurrentUser(updatedUser));
    };

    useEffect(() => {
      const isFormValid = validateFormExceptValues(Object.keys(errors), [
        'avatarUrl',
        'backgroundImageUrl',
      ]);

      handleFormValidation(isFormValid);
    }, [isValid, errors]);

    return (
      <Container
        $size='sm'
        $direction='column'
        $gap='md'
        as={'form'}
        onSubmit={handleClose(handleSubmit(handleFormSubmit))}
        ref={ref}
      >
        <FormField errorText={errors.backgroundImageUrl?.message}>
          <BackgroundImage url={uploadedBackgroundImageUrl || backgroundImageUrl}>
            <ImageEdit
              handleError={handleErrorManually('backgroundImageUrl')}
              handleChange={handleBackgroundImageUrlChange}
              absolute
            />
          </BackgroundImage>
        </FormField>
        <AvatarWrapper $align='end' $justify='flex-end'>
          <FormField errorText={errors.avatarUrl?.message}>
            <Avatar url={uploadedAvatarUrl || avatarUrl} size='xl2'>
              <ImageEdit
                handleError={handleErrorManually('avatarUrl')}
                handleChange={handleAvatarUrlChange}
                absolute
              />
            </Avatar>
          </FormField>
        </AvatarWrapper>
        <FormField errorText={errors.fullName?.message}>
          <CustomInput
            id='fullName'
            defaultValue={fullName}
            placeholder='Full name'
            {...register('fullName')}
            isInvalid={!!errors.fullName}
            maxLength={FULLNAME_LENGTH_CONSTRAINT}
          />
        </FormField>
        <FormField errorText={errors.bio?.message}>
          <CustomInput
            asTextArea
            id='bio'
            defaultValue={bio}
            placeholder='Bio'
            {...register('bio')}
            isInvalid={!!errors.bio}
            maxLength={BIO_LENGTH_CONSTRAINT}
          />
        </FormField>
        <DateOfBirthControl defaultValue={dateOfBirth} onChange={setValue} />
      </Container>
    );
  }
);

export const EditProfileForm = withLoader(BaseEditProfileForm);
