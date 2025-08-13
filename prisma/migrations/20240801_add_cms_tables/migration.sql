-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL,
    "siteName" TEXT NOT NULL DEFAULT 'Save Paws',
    "siteDescription" TEXT NOT NULL DEFAULT 'Saving Lives, One Rescue at a Time',
    "heroTitle" TEXT NOT NULL DEFAULT 'Saving Lives, One Rescue at a Time',
    "heroSubtitle" TEXT NOT NULL DEFAULT 'Join our global mission to rescue, rehabilitate, and rehome abandoned dogs.',
    "heroImage" TEXT,
    "logoUrl" TEXT,
    "faviconUrl" TEXT,
    "contactEmail" TEXT NOT NULL DEFAULT 'help@globaldogrescue.org',
    "contactPhone" TEXT NOT NULL DEFAULT '+1 (555) 123-DOGS',
    "contactAddress" TEXT NOT NULL DEFAULT 'Austin, TX, USA',
    "socialFacebook" TEXT,
    "socialTwitter" TEXT,
    "socialInstagram" TEXT,
    "socialYoutube" TEXT,
    "footerText" TEXT NOT NULL DEFAULT 'Save Paws - Making a difference worldwide',
    "metaTitle" TEXT NOT NULL DEFAULT 'Save Paws - Saving Lives Worldwide',
    "metaDescription" TEXT NOT NULL DEFAULT 'Join our global mission to rescue, rehabilitate, and rehome abandoned dogs.',
    "metaKeywords" TEXT,
    "googleAnalyticsId" TEXT,
    "facebookPixelId" TEXT,
    "customCss" TEXT,
    "customJs" TEXT,
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "maintenanceMessage" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "featuredImage" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "authorId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "featuredImage" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "categoryId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "caption" TEXT,
    "uploadedById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RescueStory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT,
    "dogName" TEXT NOT NULL,
    "dogBreed" TEXT,
    "dogAge" TEXT,
    "rescueDate" TIMESTAMP(3),
    "adoptionDate" TIMESTAMP(3),
    "rescueLocation" TEXT,
    "rescueTeam" TEXT,
    "medicalCost" DECIMAL(10,2),
    "beforeImage" TEXT,
    "afterImage" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RescueStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistics" (
    "id" TEXT NOT NULL,
    "dogsRescued" INTEGER NOT NULL DEFAULT 0,
    "dogsAdopted" INTEGER NOT NULL DEFAULT 0,
    "countriesServed" INTEGER NOT NULL DEFAULT 0,
    "volunteersActive" INTEGER NOT NULL DEFAULT 0,
    "sheltersPartner" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Statistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RescueStory_slug_key" ON "RescueStory"("slug");

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RescueStory" ADD CONSTRAINT "RescueStory_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Insert default site settings
INSERT INTO "SiteSettings" ("id", "updatedAt") VALUES ('default', CURRENT_TIMESTAMP);

-- Insert default statistics
INSERT INTO "Statistics" ("id", "dogsRescued", "dogsAdopted", "countriesServed", "volunteersActive", "sheltersPartner", "updatedAt") 
VALUES ('default', 2847, 2156, 25, 1250, 89, CURRENT_TIMESTAMP);

-- Insert default categories
INSERT INTO "Category" ("id", "name", "slug", "description", "color", "updatedAt") VALUES 
('rescue-stories', 'Rescue Stories', 'rescue-stories', 'Heartwarming stories of dog rescues', '#10B981', CURRENT_TIMESTAMP),
('news', 'News', 'news', 'Latest news and updates', '#3B82F6', CURRENT_TIMESTAMP),
('education', 'Education', 'education', 'Educational content about dog care', '#8B5CF6', CURRENT_TIMESTAMP),
('events', 'Events', 'events', 'Upcoming events and activities', '#F59E0B', CURRENT_TIMESTAMP);
