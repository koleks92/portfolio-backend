import { Router, type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma.ts';

const authRouter = Router();

authRouter.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    // check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }

    // create token
    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );

    res.json({ token });
});

export default authRouter;