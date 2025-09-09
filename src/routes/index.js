import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { addTransaction, getTransactions, updateTransaction, deleteTransaction } from '../controllers/transactionsController.js';
import { validateSchema } from '../middlewares/validateSchemaMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { signUpSchema, signInSchema } from '../schemas/authSchema.js';
import { transactionsSchema } from '../schemas/transactionSchema.js';

const router = Router();

// Rotas de Autenticação
router.post('/sign-up', validateSchema(signUpSchema), signUp);
router.post('/sign-in', validateSchema(signInSchema), signIn);

// Rotas de Transações
router.post('/transactions', authMiddleware, validateSchema(transactionsSchema), addTransaction);
router.get('/transactions', authMiddleware, getTransactions);
router.put('/transactions/:id', authMiddleware, validateSchema(transactionsSchema), updateTransaction);
router.delete('/transactions/:id', authMiddleware, deleteTransaction);

export default router;