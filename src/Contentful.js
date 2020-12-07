import {createClient} from 'contentful'

// export default createClient({
//     space: "wsz1yypo6yku",
//     accessToken: "S5jLXyjeNuTbmzsDcq9BwtMySk2ZdNaBVkbXwhkPrHI"
// });

export default createClient({
    space: process.env.REACT_APP_API_SPACE,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
});