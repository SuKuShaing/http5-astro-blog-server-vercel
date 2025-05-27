
const BtnReact = () => {
    const darLike = () => {
        console.log("Like button clicked!");
    }

    return (
        <button
            onClick={() => darLike()}
            style={{
                backgroundColor:"rgb(6, 9, 172)",
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                // background hover
                ':hover': {
                    backgroundColor: 'rgb(4, 6, 120)',
                    transform: 'scale(1.05)'
                }
            }}
        >
            Like Counter
        </button>
    )
};

export default BtnReact;