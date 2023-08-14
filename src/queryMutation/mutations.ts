import { gql } from "@apollo/client";

export const CREATE_USER_INFO = gql`
  mutation CreateUserInfo($city: String, $country: String, $address: String) {
    createUserInfo(city: $city, country: $country, address: $address) {
      id
      city
      country
      address
    }
  }
`;
export const CREATE_ABOUT = gql`
  mutation CreateAbout(
    $animal: Boolean!
    $description: String!
    $cigarette: Boolean!
    $chatOptionId: ID!
    $musicOptionId: ID!
  ) {
    createAbout(
      animal: $animal
      description: $description
      cigarette: $cigarette
      chatOptionId: $chatOptionId
      musicOptionId: $musicOptionId
    ) {
      id
      animal
      description
      cigarette
      chatOption {
        id
        content
      }
      musicOption {
        id
        content
      }
    }
  }
`;
export const ADD_PROFILE_PICTURE = gql`
  mutation AddProfilePicture($userInfoId: ID!, $file: Upload!) {
    addProfilePicture(userInfoId: $userInfoId, file: $file) {
      id
      path
    }
  }
`;
export const UPDATE_ABOUT = gql`
  mutation UpdateAbout(
    $updateAboutId: ID!
    $animal: Boolean
    $description: String
    $chatOptionId: Int
    $musicOptionId: Int
    $cigarette: Boolean
  ) {
    updateAbout(
      id: $updateAboutId
      animal: $animal
      description: $description
      chatOptionId: $chatOptionId
      musicOptionId: $musicOptionId
      cigarette: $cigarette
    ) {
      id
      animal
      description
      cigarette
      chatOption {
        id
        content
      }
      musicOption {
        id
        content
      }
    }
  }
`;

export const CREATE_CAR_MUTATION = gql`
  mutation CreateCar($seat: Int!, $brandId: Int!) {
    createCar(seat: $seat, brandId: $brandId) {
      id
      seat
      brand {
        id
        name
      }
      carPictures {
        id
        path
      }
    }
  }
`;

export const UPDATE_CAR_MUTATION = gql`
  mutation UpdateCar($updateCarId: ID!, $seat: Int, $brandId: Int) {
    updateCar(id: $updateCarId, seat: $seat, brandId: $brandId) {
      id
      seat
      brand {
        id
        name
      }
    }
  }
`;

export const ADD_PICTURE_MUTATION = gql`
  mutation AddPicture($carId: ID!, $file: Upload!) {
    addPicture(carId: $carId, file: $file) {
      id
      path
    }
  }
`;

export const ADD_PROFILE_PICTURE_MUTATION = gql`
  mutation AddProfilePicture($pictureId: ID!, $file: Upload!) {
    addProfilePicture(pictureID: $pictureId, file: $file) {
      id
      path
    }
  }
`;

export const UPDATE_USER_INFO = gql`
  mutation UpdateUserInfo(
    $updateUserInfoId: ID!
    $city: String
    $country: String
    $address: String
  ) {
    updateUserInfo(
      id: $updateUserInfoId
      city: $city
      country: $country
      address: $address
    ) {
      id
      city
      country
      address
    }
  }
`;
