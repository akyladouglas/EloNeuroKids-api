-- CreateEnum
CREATE TYPE "SupportLevel" AS ENUM ('FULL_PHYSICAL', 'PARTIAL_PHYSICAL', 'VERBAL', 'GESTURAL', 'INDEPENDENT');

-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('HAPPY', 'TIRED', 'AGITATED', 'SICK');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "diagnosis" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anamnesis" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "healthHistory" TEXT NOT NULL,
    "socialHistory" TEXT NOT NULL,
    "socialComplaint" TEXT NOT NULL,
    "termSignature" TEXT,

    CONSTRAINT "Anamnesis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Methodology" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Methodology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MethodologyStage" (
    "id" SERIAL NOT NULL,
    "methodologyId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,

    CONSTRAINT "MethodologyStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pei" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "status" TEXT NOT NULL,

    CONSTRAINT "Pei_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeiGoal" (
    "id" TEXT NOT NULL,
    "peiId" TEXT NOT NULL,
    "currentStageId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "PeiGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "professionalId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mood" "Mood" NOT NULL,
    "publicFeedback" TEXT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionGoalEntry" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "peiGoalId" TEXT NOT NULL,
    "supportLevel" "SupportLevel" NOT NULL,
    "quickNotes" TEXT,
    "milestoneReached" BOOLEAN NOT NULL DEFAULT false,
    "newStageId" INTEGER,

    CONSTRAINT "SessionGoalEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Anamnesis_patientId_roleId_key" ON "Anamnesis"("patientId", "roleId");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anamnesis" ADD CONSTRAINT "Anamnesis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anamnesis" ADD CONSTRAINT "Anamnesis_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MethodologyStage" ADD CONSTRAINT "MethodologyStage_methodologyId_fkey" FOREIGN KEY ("methodologyId") REFERENCES "Methodology"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pei" ADD CONSTRAINT "Pei_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeiGoal" ADD CONSTRAINT "PeiGoal_peiId_fkey" FOREIGN KEY ("peiId") REFERENCES "Pei"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeiGoal" ADD CONSTRAINT "PeiGoal_currentStageId_fkey" FOREIGN KEY ("currentStageId") REFERENCES "MethodologyStage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionGoalEntry" ADD CONSTRAINT "SessionGoalEntry_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionGoalEntry" ADD CONSTRAINT "SessionGoalEntry_peiGoalId_fkey" FOREIGN KEY ("peiGoalId") REFERENCES "PeiGoal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionGoalEntry" ADD CONSTRAINT "SessionGoalEntry_newStageId_fkey" FOREIGN KEY ("newStageId") REFERENCES "MethodologyStage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
