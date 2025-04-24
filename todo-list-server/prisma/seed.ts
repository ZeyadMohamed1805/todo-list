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
            name: 'Caronlina Adams',
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
        const firstName = user.name.split(' ')[0];

        const createdUser = await prisma.user.create({
            data: {
                username: user.name,
                email: user.email,
                password: hashedPassword,
                todoLists: {
                    create: [
                        {
                            title: `${firstName}'s Work`,
                            imagePath: null,
                            totalTasksCount: 3,
                            completedTasksCount: 1,
                            progress: 33,
                            tasks: {
                                create: [
                                    { title: 'Finish report', status: 'PENDING' },
                                    { title: 'Call client', status: 'COMPLETED' },
                                    { title: 'Review documents', status: 'PENDING' },
                                ],
                            },
                        },
                        {
                            title: `${firstName}'s Personal`,
                            imagePath: null,
                            totalTasksCount: 2,
                            completedTasksCount: 2,
                            progress: 100,
                            tasks: {
                                create: [
                                    { title: 'Buy groceries', status: 'COMPLETED' },
                                    { title: 'Exercise', status: 'COMPLETED' },
                                ],
                            },
                        },
                    ],
                },
            },
        });

        console.log(`Created user ${createdUser.username}`);
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
