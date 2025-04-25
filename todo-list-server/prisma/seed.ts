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
                                    { title: 'Finish report', order: 0},
                                    { title: 'Call client', isCompleted: true, order: 2 },
                                    { title: 'Review documents', order: 1 },
                                    { title: 'Email updates to manager', order: 4 },
                                    { title: 'Prepare presentation', isCompleted: true, order: 5 },
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
                                    { title: 'Buy groceries', isCompleted: true, order: 0 },
                                    { title: 'Exercise', isCompleted: true, order: 1 },
                                    { title: 'Read a book', isCompleted: true, order: 3 },
                                    { title: 'Clean the house', isCompleted: true, order: 2 },
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
                                    { title: 'Design logo', order: 0 },
                                    { title: 'Write blog post', isCompleted: true, order: 1 },
                                    { title: 'Create landing page', order: 5 },
                                    { title: 'Refactor codebase', isCompleted: true, order: 2 },
                                    { title: 'Fix bugs', isCompleted: true, order: 3 },
                                    { title: 'Test new features', order: 4 },
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
