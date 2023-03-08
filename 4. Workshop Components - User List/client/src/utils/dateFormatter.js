const dateFormatter = (input) => {
    const date = new Date(input);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default dateFormatter;