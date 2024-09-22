import { forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { Container, CustomInput, FormField } from '@/components/ui';
import { ModalContext } from '@/components/ui/Modal/context';
import { BIO_LENGTH_CONSTRAINT, FULLNAME_LENGTH_CONSTRAINT } from '@/constants/validation';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useAsyncWithLoading } from '@/hooks/useAsyncWithLoading';
import { UsersRepositoryService } from '@/services/firestore/users';
import { selectCurrentUser, updateCurrentUser } from '@/services/store/user';
import type { ManualLoadingHandleProps } from '@/types/loader';
import type { EditUser } from '@/types/user';
import {
  registerManualSetError,
  registerManualSetValue,
  validateFormExceptValues,
} from '@/utils/hookForm';
import { withLoader } from '@/utils/withLoader';

import { editProfileValidationSchema } from './validation';

import { DateOfBirthControl } from '../DateOfBirthControl';
import { ImageEditButton } from '../ImageEditButton';
import { UserAvatar } from '../UserAvatar';
import { UserAvatarWrapper } from '../UserAvatarWrapper';
import { UserBackgroundImage } from '../UserBackgroundImage';

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
      call: UsersRepositoryService.updateUser,
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
        size='sm'
        direction='column'
        gap='md'
        as={'form'}
        onSubmit={handleClose(handleSubmit(handleFormSubmit))}
        ref={ref}
      >
        <FormField errorText={errors.backgroundImageUrl?.message}>
          <UserBackgroundImage url={uploadedBackgroundImageUrl || backgroundImageUrl}>
            <ImageEditButton
              handleError={handleErrorManually('backgroundImageUrl')}
              handleChange={handleBackgroundImageUrlChange}
              absolute
            />
          </UserBackgroundImage>
        </FormField>
        <UserAvatarWrapper align='end' justify='flex-end'>
          <FormField errorText={errors.avatarUrl?.message}>
            <UserAvatar url={uploadedAvatarUrl || avatarUrl} size='xl2'>
              <ImageEditButton
                handleError={handleErrorManually('avatarUrl')}
                handleChange={handleAvatarUrlChange}
                absolute
              />
            </UserAvatar>
          </FormField>
        </UserAvatarWrapper>
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
