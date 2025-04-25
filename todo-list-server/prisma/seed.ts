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
                                    { title: 'Finish report'},
                                    { title: 'Call client', isCompleted: true },
                                    { title: 'Review documents'},
                                    { title: 'Email updates to manager'},
                                    { title: 'Prepare presentation', isCompleted: true },
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
                                    { title: 'Buy groceries', isCompleted: true },
                                    { title: 'Exercise', isCompleted: true },
                                    { title: 'Read a book', isCompleted: true },
                                    { title: 'Clean the house', isCompleted: true },
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
                                    { title: 'Design logo' },
                                    { title: 'Write blog post', isCompleted: true },
                                    { title: 'Create landing page' },
                                    { title: 'Refactor codebase', isCompleted: true },
                                    { title: 'Fix bugs', isCompleted: true },
                                    { title: 'Test new features' },
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
