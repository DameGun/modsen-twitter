import { useState } from 'react';

import { CreateTweetForm, TweetsList } from '@/components/containers';
import { Heading4, Section, Tab, Tabs } from '@/components/ui';
import { FeedSectionType } from '@/constants/tweet';

export function FeedPage() {
  const [currentSection, setCurrentSection] = useState<FeedSectionType>(FeedSectionType.ForYou);

  const handleSectionChange = (value: FeedSectionType) => () => setCurrentSection(value);

  return (
    <>
      <Tabs>
        <Tab
          $isActive={currentSection === FeedSectionType.ForYou}
          onClick={handleSectionChange(FeedSectionType.ForYou)}
        >
          <Heading4>For you</Heading4>
        </Tab>
        <Tab
          $isActive={currentSection === FeedSectionType.Following}
          onClick={handleSectionChange(FeedSectionType.Following)}
        >
          <Heading4>Following</Heading4>
        </Tab>
      </Tabs>
      <Section>
        <CreateTweetForm isLoaderFullScreen />
      </Section>
      <TweetsList />
    </>
  );
}
