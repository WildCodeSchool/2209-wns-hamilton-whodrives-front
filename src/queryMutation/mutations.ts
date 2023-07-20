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
    $smoke: Boolean!
    $chatOptionId: ID!
    $musicOptionId: ID!
  ) {
    createAbout(
      animal: $animal
      description: $description
      smoke: $smoke
      chatOptionId: $chatOptionId
      musicOptionId: $musicOptionId
    ) {
      id
      animal
      description
      smoke
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
export const UPDATE_ABOUT = gql`mutation UpdateAbout($updateAboutId: ID!, $animal: Boolean, $description: String, $chatOptionId: Int, $musicOptionId: Int, $smoke: Boolean) {
  updateAbout(id: $updateAboutId, animal: $animal, description: $description, chatOptionId: $chatOptionId, musicOptionId: $musicOptionId, smoke: $smoke) {
    id
    animal
    description
    smoke
    chatOption {
      id
      content
    }
    musicOption {
      id
      content
    }
  }
}`;

export const CREATE_CAR_MUTATION = gql`
  mutation CreateCar($seat: Int!, $modelId: Int!) {
    createCar(seat: $seat, modelId: $modelId) {
      id
      seat
      model {
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

export const UPDATE_CAR_MUTATION = gql`mutation UpdateCar($updateCarId: ID!, $seat: Int, $modelId: Int) {
  updateCar(id: $updateCarId, seat: $seat, modelId: $modelId) {
    id
    seat
    model {
      id
      name
    }
  }
}`;

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
mutation UpdateUserInfo($updateUserInfoId: ID!, $city: String, $country: String, $address: String) {
  updateUserInfo(id: $updateUserInfoId, city: $city, country: $country, address: $address) {
    id
    city
    country
    address
  }
}`; 
