import bcrypt from 'bcryptjs';
import prisma from '.';

async function main() {
    const users = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password123',
        },
        {
            name: 'Smith John',
            email: 'smith.john@example.com',
            password: 'passBlueBus',
        },
        {
            name: 'Carolina Adams',
            email: 'carolina.adams@example.com',
            password: 'passGreenBus',
        },
        {
            name: 'Emila Smith',
            email: 'emila.smith@example.com',
            password: '12111990',
        },
    ];

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        const createdUser = await prisma.user.create({
            data: {
                username: user.name,
                email: user.email,
                password: hashedPassword,
                todoLists: {
                    create: [
                        {
                            title: `${user.name.split(' ')[0]}'s Work`,
                            imagePath: null,
                            totalTasksCount: 5,
                            completedTasksCount: 2,
                            progress: 40,
                            tasks: {
                                create: [
                                    { title: 'Finish report', status: 'PENDING' },
                                    { title: 'Call client', status: 'COMPLETED', isCompleted: true },
                                    { title: 'Review documents', status: 'IN_PROGRESS' },
                                    { title: 'Email updates to manager', status: 'PENDING' },
                                    { title: 'Prepare presentation', status: 'COMPLETED', isCompleted: true },
                                ],
                            },
                        },
                        {
                            title: `${user.name.split(' ')[0]}'s Personal`,
                            imagePath: null,
                            totalTasksCount: 4,
                            completedTasksCount: 4,
                            progress: 100,
                            tasks: {
                                create: [
                                    { title: 'Buy groceries', status: 'COMPLETED', isCompleted: true },
                                    { title: 'Exercise', status: 'COMPLETED', isCompleted: true },
                                    { title: 'Read a book', status: 'COMPLETED', isCompleted: true },
                                    { title: 'Clean the house', status: 'COMPLETED', isCompleted: true },
                                ],
                            },
                        },
                        {
                            title: `${user.name.split(' ')[0]}'s Projects`,
                            imagePath: null,
                            totalTasksCount: 6,
                            completedTasksCount: 3,
                            progress: 50,
                            tasks: {
                                create: [
                                    { title: 'Design logo', status: 'PENDING' },
                                    { title: 'Write blog post', status: 'COMPLETED', isCompleted: true },
                                    { title: 'Create landing page', status: 'IN_PROGRESS' },
                                    { title: 'Refactor codebase', status: 'COMPLETED', isCompleted: true },
                                    { title: 'Fix bugs', status: 'COMPLETED', isCompleted: true },
                                    { title: 'Test new features', status: 'BLOCKED' },
                                ],
                            },
                        },
                    ],
                },
            },
        });

        console.log(`Created user: ${createdUser.username}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
