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
export const GET_MUSIC_OPTIONS = gql`
query MusicOptions {
  musicOptions {
    id
    content
  }
}
`;

export const GET_CHAT_OPTIONS = gql`
query ChatOptions {
  chatOptions {
    id
    content
  }
}
`;

export const GET_USER_LOGGED = gql`
query getUserLogged {
  userLogged {
    username
    password
    firstname
    lastname
    date_of_birth
    email
    phone
    userInfo {
      id
      city
      country
      age
      address
      about {
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
      profilPictureId
    }
    cars {
      carPictures {
        path
        id
      }
      id
      model {
        id
        name
      }
      seat
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

export const GET_CAR_MODELS = gql`
query Models {
  Models {
    id
    name
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