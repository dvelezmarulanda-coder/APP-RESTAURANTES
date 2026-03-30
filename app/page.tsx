import { FeedbackContainer } from "@/components/layout/feedback-container";
import { FeedbackWizard } from "@/components/feedback-wizard";

export default function Home() {
  return (
    <FeedbackContainer>
      <FeedbackWizard />
    </FeedbackContainer>
  );
}
