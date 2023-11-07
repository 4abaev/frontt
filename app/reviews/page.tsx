import CreateReviewForm from "@/components/review/createReviewForm";
import ReviewsList from "@/components/review/reviewsList";
import AuthGuard from "@/components/server/authGuard";

export default async function Review() {
    return (
        <AuthGuard>
            <ReviewsList />
        </AuthGuard>
    );
}
