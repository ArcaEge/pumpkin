export function load({ locals }) {
    return {
        loggedIn: locals.session !== null,
    };
};