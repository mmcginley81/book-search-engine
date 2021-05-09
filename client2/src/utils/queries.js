import gql from 'graphql-tag';

export const GET_ME = gql`
    {
        me{
            _id
            userName
            email
            bookCount
            savedBooks
        }
    }
    `;