import { gql } from '@apollo/client';

export const CREATE_USER_INFO = gql`
  mutation CreateUserInfo($city: String, $country: String, $age: Int, $address: String) {
    createUserInfo(city: $city, country: $country, age: $age, address: $address) {
      id
      city
      country
      age
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
    ) {CREATE_CAR_MUTATION
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

export const ADD_PICTURE_MUTATION = gql`
mutation AddPicture($carId: ID!, $file: Upload!) {
  addPicture(carId: $carId, file: $file) {
    id
    path
  }
}
`