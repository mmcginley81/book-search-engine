const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        user: async(parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
        },

        users: async() =>{
            return User.find()
            .select('-__v -password')
        },
        
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('books')

                return userData;
            }

            throw new AuthenticationError('No User Found')
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user);


            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })
            if(!user){
                throw new AuthenticationError('Incorrect credentials!')
            }
            const correctPw = await user.isCorrectPassword(password)
            
            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials!')
            }

            const token = signToken(user)

            return { token, user };
        }
        // saveBook: async (parent, { bookData }, context) => {
        //     const updatedUser = await User.findOneAndUpdate(
        //         { _id: context.user._id },
        //         { $push: {savedBooks: bookData}},
        //         { new: true }
        //     )
            
        //     return updatedUser
        // },
        // removeBook: async (parent, { bookId }, context) => {
        //     const updatedUser = await User.findOneAndUpdate(
        //         { _id: context.user._id },
        //         { $pull: {savedBooks: {bookId}}},
        //         { new: true }
        //     )
            
        //     return updatedUser
        // }
        
    }

};

module.exports = resolvers;