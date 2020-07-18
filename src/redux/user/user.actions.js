import userActionTypes  from './user.types';

export const setCurrentUser = user => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user
});

export const updateUserDetails = details => ({
  type: userActionTypes.UPDATE_USER_DETAILS,
  payload: details
});

export const setUserGuides = guides => ({
  type: userActionTypes.SET_USER_GUIDES,
  payload: guides
});

export const addPhoneNumber = number => ({
  type: userActionTypes.ADD_PHONE_NUMBER,
  payload: number
})

export const updateImageUrl = imageUrl => ({
  type: userActionTypes.UPDATE_IMAGE_URL,
  payload: imageUrl,
});
