import { useNavigation } from "react-router-dom";
const SubmitButton = ( props ) => {
    const { text, form } = props
    const navigation = useNavigation;
    const isSubmitting = navigation.state === "submitting";

    return (
        <button
        form={form}
        className="btn btn-neutral"
        disabled={isSubmitting}
        >
            {isSubmitting ? (
                <>
                    <span className="loading loading-spinner loading-xs"></span> 
                    submitting...
                </>)
                :(
                text || "submit"
            )}
        </button>
    )
}
export default SubmitButton;