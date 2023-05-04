export const usernameValidation = {
    required: "Username is required",
    minLength: { value: 4, message: "Username must contain between 4 and 20 characters" },
    maxLength: { value: 20, message: "Username must contain between 4 and 20 characters" },
}
export const passwordValidation = {
    required: "Password is required",
    pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@_!])\S{6,}$/, message: "Password must contain 6 or more characters, including at least one uppercase, one lowercase and one special character (@, !, _)" },
}

export const filmValidation = {
    title: {
        required: "Film title is required",
        minLength: { value: 4, message: "Title must contain 4 characters or more" },
    },
    description: {
        required: "Film description is required",
        minLength: { value: 8, message: "Description must contain 8 characters or more" },
    },
    year: {
        required: "Film release year is required",
        pattern: { value: /^(19|20)[0-9][0-9]$/, message: "Invalid year" },
    },
    genres: {
        required: "Film genres are required, insert at least one",
        pattern: { value: /[\w ]{4,}/, message: "Genres must be a list of words of 4 characters or longer, comma or hyphen separated" }
    },
    image: {
        required: "Film image is required",
        pattern: { value: /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/, message: "Invalid image URL" }
    },
    review: {
        required: "Review is required",
        minLength: 5,
    },
    rating: {
        required: "Rating is required",
    },
    search: {
        required: "Write something so we can search for it",
        pattern: {value: /\w+/, message: "Invalid characters"}
    }
}