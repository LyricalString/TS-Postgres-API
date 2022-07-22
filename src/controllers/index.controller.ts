import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from '../database'

export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const response: QueryResult = await pool.query('SELECT * FROM usersTable')
    return res.status(200).json(response.rows)
  } catch (e) {
    console.log(e)
    return res.status(500).json('Internal Server Error')
  }
}

export const getUserbyId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id: number = parseInt(req.params.id)
    const response: QueryResult = await pool.query('SELECT * FROM usersTable WHERE id = $1', [id])
    return res.status(200).json(response.rows)
  } catch (e) {
    console.log(e)
    return res.status(500).json('Internal Server Error')
  }
}

export const createUser = async (req: Request, res: Response): Promise<any> => {
  const { name, email } = req.body
  try {
    const response: QueryResult = await pool.query('SELECT * FROM usersTable WHERE email = $1', [email])
    if (response.rows.length > 0) {
      return res.status(400).json('User already exists')
    } else {
      await pool.query('INSERT INTO usersTable (name, email) VALUES ($1, $2)', [name, email])
      return res.json({
        message: 'User created successfully',
        body: {
          user: {
            name,
            email
          }
        }
      })
    }
  } catch (e) {
    console.log(e)
    return res.status(500).json('Internal Server Error')
  }
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body
  try {
    await pool.query('UPDATE usersTable SET name = $1, email = $2 WHERE id = $3', [name, email, id])
    return res.status(200).json({
      message: `User ${id} updated successfully`,
      body: {
        user: {
          name,
          email
        }
      }
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json('Internal Server Error')
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id)
  try {
    await pool.query('DELETE FROM usersTable WHERE id = $1', [id])
    return res.status(200).json({ message: `User ${id} deleted successfully` })
  } catch (e) {
    console.log(e)
    return res.status(500).json('Internal Server Error')
  }
}
