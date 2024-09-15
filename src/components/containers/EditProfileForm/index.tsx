import { forwardRef, useCallback, useContext, useEffect } from 'react';
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
import { UserAvatar } from '../UserAvatar';
import { UserAvatarWrapper } from '../UserAvatarWrapper';
import { UserBackgroundImage } from '../UserBackgroundImage';

const BaseEditProfileForm = forwardRef<HTMLFormElement, ManualLoadingHandleProps>(
  function EditProfileForm({ handleLoading }, ref) {
    const dispatch = useAppDispatch();
    const { uid, fullName, bio, dateOfBirth, backgroundImageUrl, avatarUrl } =
      useAppSelector(selectCurrentUser)!;
    const { handleClose, handleFormValidation } = useContext(ModalContext);

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
    const handleFormSubmit = async (userObj: Partial<EditUser>) => {
      const updatedUser = await call({ uid, userObj });

      if (updatedUser) {
        dispatch(updateCurrentUser(updatedUser));
        handleClose();
      }
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
        onSubmit={handleSubmit(handleFormSubmit)}
        ref={ref}
      >
        <FormField errorText={errors.backgroundImageUrl?.message}>
          <UserBackgroundImage
            url={backgroundImageUrl}
            isEditable
            handleError={handleErrorManually('backgroundImageUrl')}
            handleChange={handleSetValueManually('backgroundImageUrl')}
          />
        </FormField>
        <UserAvatarWrapper align='end' justify='flex-end'>
          <FormField errorText={errors.avatarUrl?.message}>
            <UserAvatar
              url={avatarUrl}
              size='xl2'
              isEditable
              handleError={handleErrorManually('avatarUrl')}
              handleChange={handleSetValueManually('avatarUrl')}
            />
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
