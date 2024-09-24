import { CreateTweetForm } from '@/features/tweet';
import { Section } from '@/shared/ui';
import { TweetsList } from '@/widgets/tweet';

export function FeedPage() {
  return (
    <>
      <Section>
        <CreateTweetForm isLoaderFullScreen />
      </Section>
      <TweetsList />
    </>
  );
}
